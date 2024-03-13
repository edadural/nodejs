function regularFunction() {
    console.log("Regular function 'this': ", this);

    setTimeout(function () {
        console.log("Regular function callback 'this': ", this);
    }, 1000);
}

const arrowFuncton = () => {
    console.log("Arrow function 'this': ", this);

    setTimeout(function () {
        console.log("Arrow function callback 'this': ", this);
    }, 1000);
}

const obj = {
    value: "Object value",
    methodWithRegular: function() {
        console.log("Regular method 'this': ", this);
    },
    methodWithArrow: function() {
        console.log("Arrow method 'this': ", this);
    }
}

regularFunction();
arrowFuncton();
