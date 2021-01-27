setTimeout(() => {
    console.log("ejecucion1");
    setTimeout(() => {
        console.log("ejecucion2");
        setTimeout(() => {
            console.log("ejecucion3");
            setTimeout(() => {
                console.log("ejecucion4");
            }, 4000);
        }, 10000);
    }, 2000);
}, 3000);