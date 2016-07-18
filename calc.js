$.fn.digits = function(){ 
    return this.each(function(){ 
        $(this).text( $(this).text().replace( /\d{1,3}(?=(\d{3})+(?!\d))/g , "$&,") ); 
		$(this).val( $(this).val().replace( /\d{1,3}(?=(\d{3})+(?!\d))/g , "$&,") );
    })
};
function showMonthly() {
	$('#mc_monthly_cost').show();
	$('#mc_maximum_loan').hide();
	$('#mc_btn_monthly').addClass('active');
	$('#mc_btn_max').removeClass('active');
};
function showMax() {
	$('#mc_monthly_cost').hide();
	$('#mc_maximum_loan').show();
	$('#mc_btn_monthly').removeClass('active');
	$('#mc_btn_max').addClass('active');
};
function calculate_mortgage () {
	var M;
	var tot;
	var Ppre = $('#mort_amount').val();
	var Ppos = Ppre.replace(/\,/g,'');
	var P = parseFloat(Ppos,10);
	var interest = parseFloat($('#interest_rate').val() / 100,10);
	var i = interest / 12;
	var n = parseFloat($('#mort_period').val()*12,10);
	M = P*[i*Math.pow(1+i,n)]/[Math.pow(1+i,n)-1];
	tot = (M*n);
	$('#total_mort').text("$ "+tot.toFixed());
	$('#total_monthly').text("$ "+M.toFixed()+" /month");
	replace_dig();
};
function calculate_borrow () {
	var P;
	var tot;
	var Mpre = $('#monthly_amount').val()
	var Mpos = Mpre.replace(/\,/g,'');
	var M = parseFloat(Mpos,10);
	var interest = parseFloat($('#interest_rate_borrow').val() / 100,10);
	var i = interest / 12;
	var n = parseFloat($('#mort_period_borrow').val()*12,10);
	P = [M*[Math.pow(1+i,n)-1]]/[i*Math.pow(1+i,n)];	
	tot = (M*n);
	$('#total_mort_borrow').text("$ "+tot.toFixed());
	$('#total_monthly_borrow').text("$ "+P.toFixed());
	replace_dig();
};
function replace_dig(){
	$('.numeric').each(function() {
		$(this).digits();
	});	
};
$(document).ready(calculate_mortgage());
$(document).ready(calculate_borrow());
$(document).ready(replace_dig());