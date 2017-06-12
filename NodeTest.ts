console.log("Hallo");
process.addListener("beforeExit", sayBye);

function sayBye(): void {
    console.log("Good bye");
}