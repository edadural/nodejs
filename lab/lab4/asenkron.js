async function doubleAfterDelay(x) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(x * 2);
        }, 1000);
    });
}

async function demo() {
    let result = await doubleAfterDelay(3);
    console.log(result);
}

demo()