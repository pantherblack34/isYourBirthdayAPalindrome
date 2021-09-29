let inputDate = document.querySelector('#date-input');

let dateBtn = document.querySelector('#datebtn');

let outputMsg = document.querySelector('#output-palindrome');






function reverseStr(str){
    let charList = str.split('');

    let reversedCharList = charList.reverse();

    let combineReverseList = reversedCharList.join('');

    return combineReverseList;
}

function checkPalindrome(str){
    let userInput = reverseStr(str);

    return str === userInput;
}

function conversionOfDate(date){
    let dateStr = {day : '', month : '', year : ''};

        if(date.day < 10){
            dateStr.day = '0' + date.day;
        }else{
            dateStr.day = date.day.toString();
        }
        
        if(date.month < 10){
            dateStr.month = '0' + date.month;
        }else{
            dateStr.month = date.month.toString();
        }

        dateStr.year = date.year.toString();

        return dateStr;
}

function allFormatDates(date){
    let dateStr = conversionOfDate(date);

    let ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    let mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    let yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    let ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    let mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    let yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day; 

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllDates(date){
    let palindromeList = allFormatDates(date);

    let isPalindrome = false;

    for(let i=0; i<palindromeList.length; i++){
        if(checkPalindrome(palindromeList[i])){
            isPalindrome = true;
            break;
        }
    }
    return isPalindrome;
}

function leapYearCheck(year){
    if(year%400 === 0){
        return true;
        }if(year%100 === 0){
            return false;
            }if(year%4 === 0){
                return true;
            }
            return false;
}

function nextDateArrival(date){
    let day = date.day + 1;
    let month = date.month;
    let year = date.year;

    const monthsContainDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if(month === 2){
        if(leapYearCheck(year)){
            if(day > 29){
                day = 1;
                month++;
            }else{
                if(day > 28){
                    day = 1;
                    month++;
                }
            }
        }
    }else{
        if(day > monthsContainDays[month - 1]){
          day = 1;
          month++;
        }
    }

    if(month > 12){
        month = 1;
        year++;
    }
    return {
        day : day,
        month : month,
        year : year
    };
}

function previousDateGone(date){
    let day = date.day - 1;
    let month = date.month;
    let year = date.year;

    const monthsContainDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

   if (day === 0){
       month--;

            if(month === 0){
                month = 12;
                day = 31;
                year--;
            }else if(month ===2){
                if(leapYearCheck(year)){
                    day = 29;
                }else{
                    day = 28;
                }
    }else{
        day = monthsContainDays[month - 1];
        }
   }
    return {
        day : day,
        month : month,
        year : year
    };
}

function nextPalindromeArrive(date){
    let count = 0;
    let dateArrival = nextDateArrival(date);

    while(1){
        count++;
        let newPalindrome = checkPalindromeForAllDates(dateArrival);
        if (newPalindrome){
            break;
        }
        dateArrival = nextDateArrival(dateArrival);
    }
    return [count, dateArrival];
}



