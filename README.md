Usage
=====

basic
-----

    $('input[type=file]').fileInput(settings);

    files=$('input[type=file]').data('files');

Upload files
------------

If multiple files is not use, you can use the normal submit button without problems on all browsers.

Otherwise you must build your own ajax request as `FormData` Object

Example

    data=new FormData();
    files=$('input[type=file]').data('files');
    $.each(files,function(index,file){
      data.append('file['+index+']',file);
    });
    $.ajax({
      url: 'php/upload.php',
      data: data,
      cache: false,
      contentType: false,
      processData: false,
      type: 'POST',
      success: function(data){
          alert(data);
      }
    });


Settings
========

input tags
----------

* multiple="multiple"
  activates multiple files
* accept="mimetype"
  restict browser to specific mimetype
  http://www.w3.org/TR/2012/WD-html5-20121025/states-of-the-type-attribute.html#attr-input-accept
  examples:
    video/*
    audio/*

settings: object with this keys

* preview:
  set a dom element for file preview
  default: null
  example_value: $('#preview')

* preview_template_image:
  template for image preview

  default: '<div class="col-md-2 col-sm-3 col-xs-4 img-thumbnail fileInput_preview_item"><div class="fileInput_preview_remove"><span class="glyphicon glyphicon-remove"></span></div><img class="fileInput_preview_img" alt="" src="" /></div>'

* preview_template_video
  template for video preview

  default:  '<div class="col-md-4 col-sm-6 col-xs-12 img-thumbnail fileInput_preview_item"><div class="fileInput_preview_remove"><span class="glyphicon glyphicon-remove"></span></div><video controls="controls" class="fileInput_preview_video" alt="" src="" /></div>'

* preview_template_audio
  template for audio preview

  default: '<div class="col-md-4 col-sm-6 col-xs-12 img-thumbnail fileInput_preview_item"><div class="fileInput_preview_remove"><span class="glyphicon glyphicon-remove"></span></div><audio controls="controls" class="fileInput_preview_audio" alt="" src="" /></div>'

* preview_template_default
  template for all other file types

  default: '<div class="col-md-2 col-sm-3 col-xs-4 img-thumbnail fileInput_preview_item"><div class="fileInput_preview_remove"><span class="glyphicon glyphicon-remove"></span></div><span class="fileInput_preview_filename"></span></div>'
