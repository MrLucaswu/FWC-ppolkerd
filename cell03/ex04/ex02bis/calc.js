$(document).ready(function() {
    setInterval(function() {
        alert('Please, use me...');
    }, 30000);
    $('#tryMeBtn').click(function() {
        const leftVal = $('#leftNum').val();
        const rightVal = $('#rightNum').val();
        const op = $('#operator').val();
        if (!/^\d+$/.test(leftVal) || !/^\d+$/.test(rightVal)) {
            alert('Error :(');
            console.log('Error :(');
            return;
        }
        const leftNum = parseInt(leftVal, 10);
        const rightNum = parseInt(rightVal, 10);
        if ((op === '/' || op === '%') && rightNum === 0) {
            alert("It's over 9000!");
            console.log("It's over 9000!");
            return;
        }
        let result = 0;
        switch (op) {
            case '+': result = leftNum + rightNum; break;
            case '-': result = leftNum - rightNum; break;
            case '*': result = leftNum * rightNum; break;
            case '/': result = leftNum / rightNum; break;
            case '%': result = leftNum % rightNum; break;
        }
        alert(result);
        console.log(result);
    });
});