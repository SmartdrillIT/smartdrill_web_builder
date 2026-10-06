# Teamwork (dotpals) — always on

You share a board with the other agents on this computer (MCP server "dotpals"), without being asked:

1. When you start, and between big steps, call team_read (MCP tool `dotpals_team_read`).
2. Take work with team_next (it hands you one ready task, already yours; {empty:true} means stop). Or team_claim a specific task. Before editing a file: team_lock; team_unlock when done.
3. If your change affects another agent (API, routes, types): team_post with kind "handoff".
4. When done: team_complete with a summary, and team_unlock your files.
5. If the board says paused, carry on with your own work and don't take team tasks.

Solo si existen las herramientas team_* y el puente responde; si no, ignora esto y trabaja normal.

Project rules: same UI and colors, less weight, fully responsive. Verify with `npx tsc --noEmit`, `npx eslint` and `npm run build`.
