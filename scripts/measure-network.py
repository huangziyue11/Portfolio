"""Measure HTTP transfer timings, not browser rendering or Core Web Vitals."""
import argparse
import json
import re
import subprocess
from pathlib import Path
from urllib.parse import urljoin

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('url')
parser.add_argument('--proxy')
parser.add_argument('--output', default='performance/network-after.json')
args = parser.parse_args()
common = ['curl', '-fsS', '--compressed', '--connect-timeout', '8', '--max-time', '45']
if args.proxy:
    common += ['--proxy', args.proxy]
html = subprocess.run(common + [args.url], capture_output=True, text=True, check=True).stdout
urls = {'html': args.url}
for kind, extension in [('js', 'js'), ('css', 'css')]:
    match = re.search(r'(?:src|href)="([^\"]*/assets/[^\"]+\.' + extension + ')"', html)
    if match:
        urls[kind] = urljoin(args.url, match[1])
for name in ['showreel-poster.webp', 'showreel-desktop.mp4', 'showreel-mobile.mp4']:
    urls[name] = urljoin(args.url, name)
results = {}
for name, url in urls.items():
    runs = []
    for _ in range(3):
        p = subprocess.run(common + ['-o', '/dev/null', '-w', '%{json}', url], capture_output=True, text=True)
        if p.returncode:
            runs.append({'error': p.stderr.strip()})
        else:
            raw = json.loads(p.stdout)
            runs.append({key: raw[key] for key in ['http_code', 'time_starttransfer', 'time_total', 'size_download']})
    results[name] = runs
    print(name, json.dumps(runs), flush=True)
output = Path(args.output)
output.parent.mkdir(parents=True, exist_ok=True)
output.write_text(json.dumps(results, indent=2) + '\n')
