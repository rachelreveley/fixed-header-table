/**
Copyright 2016 Chris Brantley (https://github.com/chrisbrantley)

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
**/

(function ( $ ) {
    $.fn.fixedHeaderTable = function() {
        return this.each(function() {
            
            var instance = $(this);

            console.log(this);
            headers = $(this).find('.table-header th:not(:last-child)');
            cells = $(this).find('.table-body tr:first td:not(:last-child)');

            headers.each(function(idx) {
                var header = $(this);
                var next_header = $(headers[idx+1]);
                var cell = $(cells[idx]);
                var next_cell = $(cells[idx+1]);
                
                // Initialize widths to percentages
                width_percentage = header.outerWidth()/instance.outerWidth() * 100;
                header.css('width', width_percentage + '%');
                cell.css('width', width_percentage + '%');

                function adjust_width(offset) {
                    column_width = header.outerWidth() - offset;
                    if (column_width <= 8)
                        return;
                    var total_width = instance.outerWidth();
                    column_width_percentage = column_width / total_width * 100;
                    header.css('width', column_width_percentage+'%');
                    cell.css('width', column_width_percentage+'%');
                }

                function reset_to_percentages() {
                    left_width_percentage = (header.outerWidth()/instance.innerWidth()) * 100;
                    right_width_percentage = (next_header.outerWidth()/instance.innerWidth()) * 100;
                    
                    header.css('width', left_width_percentage + '%');
                    cell.css('width', left_width_percentage + '%');
                    
                    next_header.css('width', right_width_percentage + '%');
                    next_cell.css('width', right_width_percentage + '%');
                }

                var element = null
                resizeHandle = $("<div class='resize-handle'></div>").bind('mousedown', function(e) {
                    
                    element = $(e.target);
                    element.addClass('dragging');

                    var start = e.screenX;
                    console.log(this);
                    $(window).on('mousemove', function(e) {
                        var end = e.screenX;
                        var offset = start - end;
                        start = end;
                        adjust_width(offset);
                    });
                    return false;
                })
                
                $(window).on('mouseup', function(e) {
                    if (element) {
                        element.removeClass('dragging');
                    }
                    $(window).off('mousemove');
                });


                $(this).append(resizeHandle);
            });
            
            return this;
        });
    };
}( jQuery ));