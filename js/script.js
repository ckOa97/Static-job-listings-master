import { Jobs } from "./Jobs.js";

window.addEventListener('load', async () => {
    const jobsData = await getJsonData('./data.json');
    const jobs = new Jobs(jobsData);
    jobs.createJobsList();
});

async function getJsonData(url) {
    const response = await fetch(url);
    if(!response.ok)
        throw new Error(`${response.status} ${response.statusText}`);
    return await response.json();
}