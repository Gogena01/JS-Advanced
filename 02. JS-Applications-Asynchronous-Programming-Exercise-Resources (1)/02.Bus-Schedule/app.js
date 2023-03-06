function solve() {
    const info = document.querySelector('span');

    let stop = {
        next: 'depot'
    }
    async function depart() {
        document.querySelector('input[id="depart"]').disabled = true;
        const url = `http://localhost:3030/jsonstore/bus/schedule/${stop.next}`;

        const res = await fetch(url);
        stop = await res.json();

        info.textContent = `Next stop ${stop.name}`

        document.querySelector('input[id="arrive"]').disabled = false


    }

    function arrive() {
        info.textContent = `Arriving at ${stop.name}`;

        document.querySelector('input[id="arrive"]').disabled = true
        document.querySelector('input[id="depart"]').disabled = false;

    }

    return {
        depart,
        arrive
    };
}

let result = solve();