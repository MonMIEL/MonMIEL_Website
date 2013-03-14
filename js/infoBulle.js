// Create the tooltips only on document load
$(document).ready(function() 
{
   // Notice the use of the each() method to acquire access to each elements attributes
   $('.bulle[tooltip]').each(function()
   {
	  $(this).qtip({
		content: $(this).attr('tooltip'),
		position: {
			corner:{
				target:'topRight',
				tooltip: 'bottomLeft'
			}
		},
		style: {
			name: 'red',
			padding:5,
			tip: 'bottomLeft',
			border: {
				radius:5
			}
		}				 
	  });
   });
});