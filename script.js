document.addEventListener('keypress', function(e){
    if(e.key  === 'Enter'){
        addItem();
    }
 }, false);

 
 function addItem(){
    window.alert('test');
 }