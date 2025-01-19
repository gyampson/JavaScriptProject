const paymentForm = document.getElementById('paymentForm');

paymentForm.addEventListener('submit', payWithPaystack, true);
function payWithPaystack(e){
    e.preventDefault();


let handler = payWithPaystack.setup({
    key:"pk_test_191fcb0b0f218b37879aafea3af7ca07ec096865",
    email: document.getElementById('email-address').value,
    amount: document.getElementById('amount').value,
    ref: "" +Math.floor((Math.random() * 10000000)+1),
    currency:"GHS",
    onclose: function() {
        alert("Windows closed");
    },
    callback:function(response) {
        let message = "Payment completed successfully: Reference :"+ response.reference;
        alert(message);
    }
    
});
handler.openIframe();
}