<script>
    import {onMount} from "svelte";
    import { invalidateAll } from '$app/navigation';
    import { p_sols } from "$lib/config.js";

    /** @type {import('./$types').PageData} */
    export let data;

    let scores = {};
    //console.log(scores);

    onMount(() => {
        const interval = setInterval(() => {
            let teams = data.teamData;
            let submissions = data.submissionData;

            //console.log(submissions);

            Object.keys(teams).forEach((team) => {
                scores[team] = new Array(p_sols.length).fill(false);
            });

            submissions.forEach((sub) => {
                p_sols.forEach((sol) => {
                    //console.log(sol.name, sol.name.length, sub["Problem ID "], sub["Problem ID "].length)
                    if (sol.name == sub["Problem ID "]) {
                        //console.log("AAAAAAAAA")
                        if (sub['Flag'] == sol.flag) {
                            Object.keys(teams).forEach((team) => {

                                if (teams[team].includes(sub['Email Address'])) {
                                    scores[team][p_sols.indexOf(sol)] = true;   
                                }
                            })
                            
                        }
                    }
                })



            });

            invalidateAll();
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    });

    
</script>

<div class="font-mono w-full text-center">
    <div class="text-6xl py-4 font-bold text-blue-500 bg-neutral">CyberQuest CTF</div>
    <div class="text-2xl my-4">HackCupertino CTF Demo Standings</div> 
</div>

{#each Object.keys(scores) as score}
    <div class="w-full m-5">
        <div class="text-2xl text-center font-poppins">
            {score} - {scores[score].filter(item => item).length}/{p_sols.length}
        </div>
        <div class="text-center">
            <progress class="progress progress-success w-50 h-5" value={scores[score].filter(item => item).length} max={p_sols.length}></progress>
        </div>
    </div>
{/each}

