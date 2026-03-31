
const runButton = document.getElementById('sims-button')!


runButton.addEventListener('mousedown', function () {
    runButton.style.backgroundColor = '#727272'
})

runButton.addEventListener('mouseup', function () {
    runButton.style.backgroundColor = '#f2f2f2'
})

const simsProgress = document.getElementById('sims-progress-bar')!
const nsimsProgressText = document.getElementById('nsims-progress-text')!
const nsimsText = document.getElementById('nsims-text')!
const nshotsText = document.getElementById('nshots-text')!
const nhitsText = document.getElementById('nhits-text')!
const equationText = document.getElementById('prob-equation-text')!
const probText = document.getElementById('prob-text')!
const trueProbText = document.getElementById('true-prob-text')!
const coinFlipSimText = document.getElementById('coin-flip-sim-text')!

function getShotSequence(n: number, p: number) {
    const arr = Array<number>(n)
    for (let i = 0; i < arr.length; i++) {
        arr[i] = +(Math.random() < p) //.random() follows the uniform distribution
    }
    return arr
}

function simulate(nsims: number, nshots: number, prob: number) {
    const sims = Array<Array<number>>(nsims)

    for (let i = 0; i < nsims; i++) {
        sims[i] = getShotSequence(nshots, prob)
    }
    return sims
}

// mean of all non-null elements, if length is 0, returns 0
function naMean(arr: Array<number | null>) {
    let sum = 0
    const filteredArr = arr.filter((e) => e != null)
    if (filteredArr.length == 0) return null
    for (const v of filteredArr) {
        sum += v
    }
    return sum / filteredArr.length
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
async function updateProgress(pct: number, nsims: number, avgSoFar: number) {
    if (nsims == 1) {
        nsimsProgressText.textContent = '1 simulation'
        nsimsText.textContent = '1 simulation'
    }
    else {
        nsimsProgressText.textContent = nsims + ' simulations'
        nsimsText.textContent = nsims + ' simulations'
    }
    simsProgress.style.width = 100 * pct + '%'
    await sleep(1)
    probText.textContent = (100 * avgSoFar)?.toFixed(2) + '%'
}

async function calculateConditionalProb(k: number, sims: Array<Array<number>>) {
    const probs = []

    for (let arr_index = 0; arr_index < sims.length; arr_index++) {
        const arr = sims[arr_index]
        const filteredArr = []
        for (let i = k; i < arr.length; i++) {
            let conditionTrue = true
            // check if the previous k values are all 1
            for (let j = i - 1; j >= i - k; j--) {
                if (arr[j] == 0) {
                    conditionTrue = false
                    break
                }
            }
            // if the check passed, the add the value to the filtered array
            if (conditionTrue) {
                filteredArr.push(arr[i])
            }
        }
        // push the calculated mean for this simulation
        probs.push(naMean(filteredArr))
        if ((arr_index % 43 == 0) || (arr_index == sims.length - 1)) {
            await updateProgress((arr_index + 1) / sims.length, arr_index + 1, naMean(probs)!)
        }
    }
    // return the mean of all the means
    return naMean(probs)
}

async function defSims(nsims: number, nshots: number, prob: number, nhits: number) {
    const defData = simulate(nsims, nshots, prob)
    const defCondProb = await calculateConditionalProb(nhits, defData)
    probText.textContent = (100 * (defCondProb)!)?.toFixed(2) + '%'
}

defSims(100, 10, 0.5, 2)

runButton.addEventListener('click', async function () {

    const nsims = (document.getElementById('nsims') as HTMLSelectElement).value
    const nhits = (document.getElementById('nhits') as HTMLSelectElement).value
    const prob = (document.getElementById('prob') as HTMLSelectElement).value
    const nshots = (document.getElementById('nshots') as HTMLSelectElement).value

    if (parseInt(nsims) == 1) {
        nsimsText.textContent = '1 simulation'
    }
    else {
        nsimsText.textContent = nsims + ' simulations'
    }
    // equationText.textContent = '\(\text{Pr}(H|H^'+nhits+')\)' //need to figure out refreshing math
    if (parseInt(nhits) == 1) {
        nhitsText.textContent = '1 consecutive hit'
    }
    else {
        nhitsText.textContent = nhits + ' consecutive hits'
    }
    nshotsText.textContent = nshots
    trueProbText.textContent = 100 * parseFloat(prob) + '%'

    const data = simulate(parseInt(nsims), parseInt(nshots), parseFloat(prob))
    const conditionalProb = calculateConditionalProb(parseInt(nhits), data)
    coinFlipSimText.textContent = data[0].map(e => e == 1 ? "H":"M").join('')
    probText.textContent = (100 * (await conditionalProb)!)?.toFixed(2) + '%'

})