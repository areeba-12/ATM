#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

let myBalance = 100000; // Dollar

let myPin = 2390;

let pinAnswer = await inquirer.prompt(
 [
     {
         name: "pin",
         type: "number",
         message: chalk.yellow("Enter your pin code:")
     }
])

if (pinAnswer.pin === myPin){
    console.log(chalk.green("\nPin is Correct, Login Sucessfully\n"));
    // console.log(`Current Account Balance is ${myBalance}`)


   let operationAns = await inquirer.prompt(
        [
            {

             name: "operation",
             message: "please select option",
             type: "list",
             choices: ["withdraw", "check balance"]
            }
        ]
    );

    console.log(operationAns);

    if (operationAns.operation === "withdraw") {
        let withdrawAns = await inquirer.prompt([
            {
                name: "withdrawMethod",
                type: "list",
                message: "select a withdrawal method:",
                choices: ["Fast Cash","Enter Amount"]

            }
        ])
        if(withdrawAns.withdrawMethod === "Fast Cash"){
            let fastCashAns = await inquirer.prompt([
                {
                    name: "fastCash",
                    type: "list",
                    message: "Select Amount",
                    choices: [1000,2000,5000,10000,20000,50000]
                }
            ])
            if(fastCashAns.fastCash > myBalance){
                console.log(chalk.red("Insufficient Balance"));
            }
            else{
                myBalance -= fastCashAns.fastCash
                console.log(`${fastCashAns.fastCash}withdraw Sucessfully`);
                console.log(`Your Remaining Balance is: ${myBalance}`);
            }
            
        }
        else if(withdrawAns.withdrawMethod === "Enter Amount"){

        }
        let amountAns = await inquirer.prompt(
            [
                {
                    name: "amount",
                    message: "enter your amount to withdraw",
                    type: "number"
                }
            ])
            if(amountAns.amount > myBalance){
                console.log(chalk.red("Insufficient Balance"));
            }
        
// =, -=, +=,
myBalance -= amountAns.amount;
        console.log("Your remaining balance is " + myBalance)

} else if (operationAns.operation === "check balance"){
    console.log("Your remaining balance is " + myBalance)
}

}

else {
    console.log(chalk.red("Incorrect pin number"));
}