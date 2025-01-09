//Create a function that takes an integer as an argument and returns "Even" for even numbers or "Odd" for odd numbers.

function evenOrOdd(number) {
    if(number % 2 === 0){
      return 'Even';
    }
    else{
      return 'Odd';
    }
  }

  /** Complete the function so that it finds the average of the three scores passed to it and returns the letter value associated with that grade.

  Numerical Score	Letter Grade
  90 <= score <= 100	'A'
  80 <= score < 90	'B'
  70 <= score < 80	'C'
  60 <= score < 70	'D'
  0 <= score < 60	'F'

  Tested values are all between 0 and 100. Theres is no need to check for negative values or values greater than 100.
  **/

  function findGrade(class1, class2, class3){
    const average = (class1 + class2 + class3)/3
    if(average >= 90 && average <= 100) return 'A'
    else if (average < 90 && averag >= 80) return 'B'
    else if(average < 80 && average >= 70) return 'C'
    else if(average < 70 && average >= 60) return 'D'
    else return 'F'
  }