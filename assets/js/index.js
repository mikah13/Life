$(document).ready(function() {
    function getInputData() {
        let title = $('#title').val();
        let desc = $('#description').val();
        let list = $('#list').val();
        let done = false;
        if (title.trim() !== '') {
            return JSON.stringify({title, desc, list, done});
        }
        return null;
    }
    function storeData(storage) {
        let data = getInputData();
        if (data) {
            let list = JSON.parse(data).list;
            let length = storage.length;
            storage.add(`${list}${length}`, data);
        }
        displayData(storage);
    }
    function removeData() {
        storage.clear();
    }
    function displayItem(title, desc) {
        return
        `<li class="collection-item">
            <label>
                <input type="checkbox" />
                <span>${title}</span>
                <span>${desc} $</span>
            </label>
            <a href="#!" class="secondary-content">
                <i class="material-icons" style="color:red">close</i>
            </a>
        </li>`;
    }
    function displayData(storage) {
        $('#do-item').empty();
        $('#buy-item').empty();
        storage.getList().forEach((a, b) => {
            a = JSON.parse(a);
            let checked = a.done
                ? "checked"
                : "";
            let redText = a.done
                ? "color: red !important; text-decoration:line-through"
                : ""
            let item = `<li class="collection-item">
                    <label>
                        <input ${checked} id="check-${b}" class="check" type="checkbox" />
                        <span style="${redText}" id="label-${b}" class="item-title">${a.title}</span>
                        <span class="item-desc">${a.desc}</span>
                    </label>
                    <a href="#!" class="secondary-content delete" id="close-${b}">
                        <i class="material-icons" style="color:red">close</i>
                    </a>
                </li>`
            if (a.list === 'do') {
                $('#do-item').append(item)
            } else {
                $('#buy-item').append(item)
            }
        });
        render(storage);
    }
    function render(storage) {
        $('.check').click(function() {
            let id = $(this).attr('id').split('check-')[1];
            if ($(this)[0].checked) {
                $(`#label-${id}`).attr('style', ' color: red !important; text-decoration:line-through')
                storage.itemDone(id);
            } else {
                $(`#label-${id}`).attr('style', '')
                storage.itemUndo(id);
            }
        })
        $('.delete').click(function() {
            let id = $(this).attr('id').split('close-')[1];
            storage.delete(id);
            displayData(storage);
        })
    }
    function clearInput() {
        $('#title').val('');
        $('#description').val('');
        $('#list').val('do');
    }
    let storage = new Storage();
    $('.sidenav').sidenav();
    $('.modal').modal();
    $('select').formSelect();
    $('#submit').click(function() {
        storeData(storage);
        clearInput();
    })

    $(document).keypress(function(e) {
        if (e.keyCode === 13 && $('.modal').css('display') !== 'none') {
            storeData(storage);
            clearInput();
            $('.modal').modal('close');
        }
    });
    displayData(storage);
});
