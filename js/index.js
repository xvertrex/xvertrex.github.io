
//slider

jQuery(document).ready(function ($) {


  setInterval(function () {
    moveRight();
  }, 2700);


	var slideCount = $('#slider ul li').length;
	var slideWidth = $('#slider ul li').width();
	var slideHeight = $('#slider ul li').height();
	var sliderUlWidth = slideCount * slideWidth;

	$('#slider').css({ width: slideWidth, height: slideHeight });

	$('#slider ul').css({ width: sliderUlWidth, marginLeft: - slideWidth });

    $('#slider ul li:last-child').prependTo('#slider ul');

		function moveLeft() {
				$('#slider ul').animate({
						left: + slideWidth
				}, 450, function () {
						$('#slider ul li:last-child').prependTo('#slider ul');
						$('#slider ul').css('left', '');
				});
		};

		function moveRight() {
				$('#slider ul').animate({
						left: - slideWidth
				}, 450, function () {
						$('#slider ul li:first-child').appendTo('#slider ul');
						$('#slider ul').css('left', '');
				});
		};

    $('a.control_prev').click(function () {
        moveLeft();
    });

    $('a.control_next').click(function () {
        moveRight();
    });

});

// video overlayer: start

$(".js-overlay-start").unbind("click").bind("click", function(e) {
	e.preventDefault();
	var src = $(this).attr("data-url");
	$(".overlay-video").show();
	setTimeout(function() {
		$(".overlay-video").addClass("o1");
		$("#player").attr("src", src);
	}, 100);
});

// video overlayer: close it if you click outside of the modal

$(".overlay-video").click(function(event) {
	if (!$(event.target).closest(".videoWrapperExt").length) {
		var PlayingVideoSrc = $("#player").attr("src").replace("&autoplay=1", "");
		$("#player").attr("src", PlayingVideoSrc);
		$(".overlay-video").removeClass("o1");
		setTimeout(function() {
			$(".overlay-video").hide();
		}, 600);
	}
});

// video overlayer: close it via the X icon

$(".close").click(function(event) {
		var PlayingVideoSrc = $("#player").attr("src").replace("&autoplay=1", "");
		$("#player").attr("src", PlayingVideoSrc);
		$(".overlay-video").removeClass("o1");
		setTimeout(function() {
			$(".overlay-video").hide();
		}, 600);

});











//Animate CSS - add and remove animation function
var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

$.fn.extend({
    animateCss: function (animationName) {
        this.addClass('animated ' + animationName).one(animationEnd, function(){
            $(this).removeClass('animated ' + animationName);
        });
        return this;
    },

    //Show modal animation
    animateCssShowModal: function (animationName) {
        this.addClass('animated ' + animationName).one(animationEnd, function(){
            $(this).removeClass(animationName);
        });
        return this;
    },

    //Hide modal animation
    animateCssHideModal: function (animationName) {
        this.addClass('animated ' + animationName).one(animationEnd, function(){
            $(this).removeClass('animated ' + animationName);
            $(this).modal('hide');
        });
        return this;
    },

    //Animate element, then hide parent modal
    animateCssHideParentModal: function (animationName, modalAnimation) {
        this.addClass('animated ' + animationName).one(animationEnd, function(){
            $(this).parents('.modal').addClass(modalAnimation);
        });
        return this;
    }

}); //END jQuery extend



//Form validation
$('form#newsletter').on('submit', function(e){
  e.preventDefault();
  $(this).addClass('was-validated');

  //if invalid:
    //remove valid class, add invalid class
    $('input:invalid', this).parent().removeClass('valid');
    $('input:invalid', this).parent().addClass('invalid');

    //show invalid response
    $('input:invalid', this).parent().next('.invalid-input').slideDown();

    //invalid animation
    $('input:invalid', this).parent().animateCss('shake');

  //if valid:
    //add 'corrected' class if it was invalid before
    //this allows the invalid message to slideup before the animation begins
    if( $('input:valid', this).parent().hasClass('invalid') ){
      $('input:valid', this).parent().removeClass('invalid');
      $('input:valid', this).parent().addClass('corrected');
    }
    //otherwise, add 'valid' class
    else if( !$('input:valid', this).parent().hasClass('invalid') ){
      $('input:valid', this).parent().addClass('valid');
    }

    //hide invalid response
    $('input:valid', this).parent().next('.invalid-input').slideUp();

    //valid animation
    $('input:valid', this).parent().animateCssHideParentModal('bounceOutRight', 'zoomOut');

}); //END form validation
