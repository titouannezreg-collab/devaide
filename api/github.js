export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') { res.status(200).end(); return; }

  const OWNER = 'titouannezreg-collab';
  const REPO  = 'devaide-tickets';
  const TOKEN = process.env.GITHUB_TOKEN;

  const path = req.query.path || '';
  const url  = `https://api.github.com/repos/${OWNER}/${REPO}${path}`;

  const options = {
    method: req.method,
    headers: {
      Authorization: `token ${TOKEN}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json'
    }
  };

  if (req.method === 'POST' && req.body) {
    options.body = JSON.stringify(req.body);
  }

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
