import {getTeamData, getSubmissionData} from "$lib/db.js";

export async function load({ fetch }) {
    const teamData = await getTeamData();
    const submissionData = await getSubmissionData();

    //console.log(teamData);
    //console.log(submissionData);

    return { teamData, submissionData };
}