const createAutoComplete = ({ root, fetchData, renderOption, onOptionSelected, inputValue }) => {

    root.innerHTML = `<label><b>Search</b></label>
    <input type="text" class="input"/>
    <div class="dropdown">
        <div class="dropdown-menu">
            <div class="dropdown-content results"/>
        </div>
    </div> 
    `;
    const searchInput = root.querySelector('.input');
    const dropdown = root.querySelector('.dropdown');
    const resultsWrapper = root.querySelector('.results');

    const onInput = async (event) => {
        const items = await fetchData(event.target.value);

        resultsWrapper.innerHTML = '';

        if (!items.length) {
            dropdown.classList.remove('is-active');
            return;
        }

        dropdown.classList.add('is-active');

        for (let item of items) {
            const a = document.createElement('a');
            a.classList.add('dropdown-item');
            a.innerHTML = renderOption(item);

            a.addEventListener('click', (event) => {
                dropdown.classList.remove('is-active');
                searchInput.value = inputValue(item);
                resultsWrapper.innerHTML = '';
                onOptionSelected(item);
            })
            resultsWrapper.appendChild(a);
        }
    };

    searchInput.addEventListener('input', debounce(onInput));
    document.addEventListener('click', (event) => {
        if (!root.contains(event.target)) {
            dropdown.classList.remove('is-active');
            resultsWrapper.innerHTML = '';
        }
    });
};