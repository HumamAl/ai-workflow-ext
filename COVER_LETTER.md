Hi,

The "resilient" text insertion is the real work here — ChatGPT's DOM structure changes enough that naive insertion breaks. Built a demo showing how I'd handle it: https://ai-workflow-ext.vercel.app

Context menu, toolbar icon, and a retry mechanism that checks for the input element before injecting. All in plain JS, Manifest V3. Previously built an AI workflow automation tool that cut a 4-hour manual process to 20 minutes.

One thing worth confirming: should the extension target ChatGPT's web interface only, or does it need to work with other AI tools as well? That changes the DOM selector strategy.

Quick call to align on scope, or I can draft the first milestone for review?

Humam

P.S. Happy to record a quick Loom walkthrough of the demo if that helps.
