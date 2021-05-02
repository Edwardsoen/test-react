

// const fetch =require('node-fetch');
// const url = "http://localhost:8000/search?search=landscape&page=1&tag="
// // fetch(url).then(d => console.log(d))
// console.log("SYNCHRONOUS")



// // let mPromise = new Promise(function(myResolve, myReject){ 
// //     setTimeout(function() { myResolve("I love You !!"); }, 3000);
// // });

// let mPromise2 = new Promise(function(myResolve, myReject){ 
    
//     console.log("Promsie started ")
    

//     myResolve("DONE")
//     return Promise.resolve().then(d => { 
//         var i  = 0; 
//         for(i; i <= 5; i++){
//             console.log(i)
//         }
//     })
    
// });



// console.log("SYNC1")
// // mPromise.then(d => console.log(d))
// mPromise2.then(d => console.log(d))

// console.log("SYNC2")


test = () => { 
    return new Promise((resolve, reject ) => {
        console.log("testing asnyc")
        resolve("testig")
        return Promise.resolve().then(d => "a").then(d => console.log(d))

    })
}



console.log("SYNC1")
test()
console.log("SYNC2")