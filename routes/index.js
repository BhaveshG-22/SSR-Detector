const { Router } = require('express');
const { SuccessResponseObject } = require('../common/http');

const r = Router();


r.get('/health', (req, res) => res.status(200).json(new SuccessResponseObject('Alive')));


r.get('/check-repo', async (req, res) => {
    const { repoPath, githubToken } = req.query;

    if (!repoPath) {
        return res.status(400).json({ error: 'repoPath is required' });
    }

    try {
        const results = await detectSSR(repoPath, githubToken);
        return res.json(new SuccessResponseObject({ results }));
    } catch (error) {
        console.error('Error analyzing repository:', error);
        return res.status(500).json({ error: 'Failed to analyze repository', details: error.message });
    }
});

module.exports = r;
