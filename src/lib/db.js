import { TEAM_SHEET_ID, SUBMISSION_SHEET_ID } from "$env/static/private";

export async function getTeamData() {
    console.log(`https://opensheet.elk.sh/${TEAM_SHEET_ID}/Responses`);

    const team_data = (await fetch(
        `https://opensheet.elk.sh/${TEAM_SHEET_ID}/Responses`
    ).then((res) => res.json())
    .then((data) => {
        let teams = {};
        data.forEach(function (item) {
            //console.log(item);
            let team_name = item['Team Name (case sensitive)'];
            let email = item['Email Address'];
            if (team_name in teams) {
                teams[team_name].push(email);
            } else {
                teams[team_name] = [email];
            }
        });

        //console.log(teams);
        return teams;
    }));

    return team_data;
}

export async function getSubmissionData() {
    const sub_data = (await fetch(
        `https://opensheet.elk.sh/${SUBMISSION_SHEET_ID}/Responses`
    ).then((res) => res.json())
    .then((data) => {
        return data;
    }));

    return sub_data;
}