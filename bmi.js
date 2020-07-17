const bmi = function(m,e){
    let total = m / Math.pow(e, 2); 
    return Math.round(total);
} 

module.exports = bmi;