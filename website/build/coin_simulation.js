"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const runButton = document.getElementById('sims-button');
runButton.addEventListener('mousedown', function () {
    runButton.style.backgroundColor = '#727272';
});
runButton.addEventListener('mouseup', function () {
    runButton.style.backgroundColor = '#f2f2f2';
});
const simsProgress = document.getElementById('sims-progress-bar');
const nsimsProgressText = document.getElementById('nsims-progress-text');
const nsimsText = document.getElementById('nsims-text');
const nshotsText = document.getElementById('nshots-text');
const nhitsText = document.getElementById('nhits-text');
const equationText = document.getElementById('prob-equation-text');
const probText = document.getElementById('prob-text');
const trueProbText = document.getElementById('true-prob-text');
const coinFlipSimText = document.getElementById('coin-flip-sim-text');
function getShotSequence(n, p) {
    const arr = Array(n);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = +(Math.random() < p); //.random() follows the uniform distribution
    }
    return arr;
}
function simulate(nsims, nshots, prob) {
    const sims = Array(nsims);
    for (let i = 0; i < nsims; i++) {
        sims[i] = getShotSequence(nshots, prob);
    }
    return sims;
}
// mean of all non-null elements, if length is 0, returns 0
function naMean(arr) {
    let sum = 0;
    const filteredArr = arr.filter((e) => e != null);
    if (filteredArr.length == 0)
        return null;
    for (const v of filteredArr) {
        sum += v;
    }
    return sum / filteredArr.length;
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
function updateProgress(pct, nsims, avgSoFar) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        if (nsims == 1) {
            nsimsProgressText.textContent = '1 simulation';
            nsimsText.textContent = '1 simulation';
        }
        else {
            nsimsProgressText.textContent = nsims + ' simulations';
            nsimsText.textContent = nsims + ' simulations';
        }
        simsProgress.style.width = 100 * pct + '%';
        yield sleep(1);
        probText.textContent = ((_a = (100 * avgSoFar)) === null || _a === void 0 ? void 0 : _a.toFixed(2)) + '%';
    });
}
function calculateConditionalProb(k, sims) {
    return __awaiter(this, void 0, void 0, function* () {
        const probs = [];
        for (let arr_index = 0; arr_index < sims.length; arr_index++) {
            const arr = sims[arr_index];
            const filteredArr = [];
            for (let i = k; i < arr.length; i++) {
                let conditionTrue = true;
                // check if the previous k values are all 1
                for (let j = i - 1; j >= i - k; j--) {
                    if (arr[j] == 0) {
                        conditionTrue = false;
                        break;
                    }
                }
                // if the check passed, the add the value to the filtered array
                if (conditionTrue) {
                    filteredArr.push(arr[i]);
                }
            }
            // push the calculated mean for this simulation
            probs.push(naMean(filteredArr));
            if ((arr_index % 43 == 0) || (arr_index == sims.length - 1)) {
                yield updateProgress((arr_index + 1) / sims.length, arr_index + 1, naMean(probs));
            }
        }
        // return the mean of all the means
        return naMean(probs);
    });
}
function defSims(nsims, nshots, prob, nhits) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const defData = simulate(nsims, nshots, prob);
        const defCondProb = yield calculateConditionalProb(nhits, defData);
        probText.textContent = ((_a = (100 * (defCondProb))) === null || _a === void 0 ? void 0 : _a.toFixed(2)) + '%';
    });
}
defSims(100, 10, 0.5, 2);
runButton.addEventListener('click', function () {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const nsims = document.getElementById('nsims').value;
        const nhits = document.getElementById('nhits').value;
        const prob = document.getElementById('prob').value;
        const nshots = document.getElementById('nshots').value;
        if (parseInt(nsims) == 1) {
            nsimsText.textContent = '1 simulation';
        }
        else {
            nsimsText.textContent = nsims + ' simulations';
        }
        // equationText.textContent = '\(\text{Pr}(H|H^'+nhits+')\)' //need to figure out refreshing math
        if (parseInt(nhits) == 1) {
            nhitsText.textContent = '1 consecutive hit';
        }
        else {
            nhitsText.textContent = nhits + ' consecutive hits';
        }
        nshotsText.textContent = nshots;
        trueProbText.textContent = 100 * parseFloat(prob) + '%';
        const data = simulate(parseInt(nsims), parseInt(nshots), parseFloat(prob));
        const conditionalProb = calculateConditionalProb(parseInt(nhits), data);
        coinFlipSimText.textContent = data[0].map(e => e == 1 ? "H" : "M").join('');
        probText.textContent = ((_a = (100 * (yield conditionalProb))) === null || _a === void 0 ? void 0 : _a.toFixed(2)) + '%';
    });
});
