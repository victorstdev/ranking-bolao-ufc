# Ranking Bolão UFC

This is a small static site that shows a ranking list for a "bolão" (pool) using a JSON file as the data source.

How to run locally:

- Using Python 3 (recommended):

```powershell
# From the repository root
python -m http.server 8000
# Then open http://localhost:8000 in your browser
```

- Using Node (with npm installed):

```powershell
# From the repository root
npx http-server -p 8000
# Then open http://localhost:8000 in your browser
```

Notes:
- The app loads `apostadores.json` via `fetch`. Browsers block file:// fetch requests, so serving the folder with a local server is recommended.
- To change the ranking data, edit `apostadores.json`.
