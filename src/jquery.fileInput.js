/**
 * Author: TuxCoder <git@o-g.at>
 * File: jquery.fileInput.js
 * License: GPL V2
 *
 */

(function( $ ) {
  defaults={
    preview:null,
    preview_template_default: '<div class="col-md-2 col-sm-3 col-xs-4 img-thumbnail fileInput_preview_item"><div class="fileInput_preview_remove"><span class="glyphicon glyphicon-remove"></span></div><span class="fileInput_preview_filename"></span></div>',
    preview_template_image:   '<div class="col-md-2 col-sm-3 col-xs-4 img-thumbnail fileInput_preview_item"><div class="fileInput_preview_remove"><span class="glyphicon glyphicon-remove"></span></div><img   class="fileInput_preview_image" alt="" src="" /></div>',
    preview_template_video:   '<div class="col-md-4 col-sm-6 col-xs-12 img-thumbnail fileInput_preview_item"><div class="fileInput_preview_remove"><span class="glyphicon glyphicon-remove"></span></div><video controls="controls" class="fileInput_preview_video" alt="" src="" /></div>',
    preview_template_audio:   '<div class="col-md-4 col-sm-6 col-xs-12 img-thumbnail fileInput_preview_item"><div class="fileInput_preview_remove"><span class="glyphicon glyphicon-remove"></span></div><audio controls="controls" class="fileInput_preview_audio" alt="" src="" /></div>'
  }

  function onChange(e) {
    var input=$(e.currentTarget);
    var settings=input.data('settings');

    $.each(e.currentTarget.files,function(k,file) {
      //if multiple
      if(input.attr('multiple')!=undefined) {
        input.data('files').push(file);
      }else {
        input.data('files',[file]);
        $(settings.preview).children().remove();
      }

      if(settings.preview != null) {
        if(input.attr('multiple')==undefined) {
          $(settings.preview).children().remove();
        }
        var div;
        switch(file.type.split('/')[0]) {
          case 'image':
            div=$(settings.preview_template_image);
            var image=div.find('.fileInput_preview_image')[0];
            image.src=URL.createObjectURL(file);
            break;
          case 'video':
            div=$(settings.preview_template_video);
            var video=div.find('.fileInput_preview_video')[0];
            video.src=URL.createObjectURL(file);
            break;
          case 'audio':
            div=$(settings.preview_template_audio);
            var audio=div.find('.fileInput_preview_audio')[0];
            audio.src=URL.createObjectURL(file);
            break;
          default:
            div=$(settings.preview_template_default);
            break;
        }
        div.data('file',file);
        div.data('input',input);
        div.find('.fileInput_preview_remove').on('click',onRemove);
        div.find('.fileInput_preview_filename').text(file.name);
        $(settings.preview).append(div);
      }
    });
    //if multiple
    if(input.attr('multiple')!=undefined) {
      input[0].value='';
    }
  };

  function onRemove(e) {
    item=$(e.currentTarget).parent('.fileInput_preview_item');
    files=item.data('input').data('files');
    files.splice(files.indexOf(item.data('file')), 1);
    item.remove();
  }

  $.fn.fileInput=function(settings){
    settings=$.extend({},defaults,settings);
    this.data('settings',settings);
    this.data('files',[]);

    this.on('change', onChange);
  }
})( jQuery );


