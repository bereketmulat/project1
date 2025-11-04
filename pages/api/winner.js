export default function handler(req, res) {
    // TODO: Replace this array with your 10 selected numbers.
    const values = [5,10,15,20,25,30,35,40,45,50]
    
    let winninglotto = []  
   // let selectednumbers = []  
    for (let i = 0; i < 3; i++) {
        // get a random position from the array
        const randomPos = Math.floor(Math.random() * ((values.length-1) - 0 + 1) + 0)
     //   const randomPos2 = Math.floor(Math.random() * ((values.length-1) - 0 + 1) + 0)

        // add it to the winning numbers
        winninglotto.push(values[randomPos])
     //   selectednumbers.push(values[randomPos2])


        // remove that item from the values arrays so it cannot be selected again
        values.splice(randomPos, 1)
      //  values.splice(randomPos2, 1)

        // repeat this process 3 times so you end up with 3 randomly selected numbers
    }
    console.log("Generated winning lotto numbers:", winninglotto);
   
    return res.json({ LottoNumber: winninglotto });
   
}
   