class App {
    constructor() {
        this.notes = [];
        this.title = '';
        this.text = '';
        this.id = ''


        this.$notes = document.querySelector('#notes')
        this.$placeholder = document.querySelector('#placeholder')
        this.$form = document.querySelector('#form')
        this.$noteTitle = document.querySelector('#note-title')
        this.$noteText = document.querySelector('#note-text')
        this.$formButtons = document.querySelector('#form-buttons')
        this.$formCloseBtn = document.querySelector('#form-close-button')
        this.$modal = document.querySelector('.modal-content')
        this.$modalTitle = document.querySelector('.modal-title')
        this.$modalText = document.querySelector('.modal-text')
        this.$modalCloseBtn = document.querySelector('.modal-close-button')



        this.addEventListeners();
    }


addEventListeners() {
   document.body.addEventListener('click', event => {
    this.handleFormClick(event)
    this.selectNote(event)
    this.openModal(event)
   }) 

   this.$form.addEventListener('submit', event => {
    event.preventDefault()
    let title = this.$noteTitle.value;
    let text = this.$noteText.value;
    const hasNote = title || text;

    if (hasNote) {
        this.addNote({title: title, text: text})
    } 
   })

   this.$formCloseBtn.addEventListener('click', event => {
    event.stopPropagation()
    this.closeForm()
   })
   
   this.$modalCloseBtn.addEventListener('click', event => {
    this.closeModal(event)   
    


   })

}


handleFormClick(event) {
    const isFormClicked = this.$form.contains(event.target)

    let title = this.$noteTitle.value;
    let text = this.$noteText.value;
    const hasNote = title || text;

    if (isFormClicked) {
        this.openForm()
        
        
    } else if(hasNote) {
        this.addNote({title, text})
    }else {
        this.closeForm()
    }

    }

    openForm() {
        this.$form.classList.add('form-open');
        this.$noteTitle.style.display = "block";
        this.$formButtons.style.display = 'block';
        
    }

    closeForm() {
        this.$form.classList.remove('form-open');
        this.$noteTitle.style.display = "none";
        this.$formButtons.style.display = 'none';
        this.$noteTitle.value = ''
        this.$noteText.value = ''
    }

    openModal(event) {
        if (event.target.closest('.note')) {
            this.$modal.classList.toggle('open-modal')
            this.$modalTitle.value = this.title
            this.$modalText.value = this.text

        }
    }

    closeModal(event) {
        this.editNote(event)
        this.$modal.classList.toggle('open-modal')
    }

    addNote({title, text}) {
        const newNote = {
            title,
            text,
            color: 'white',
            id: this.notes.length > 0 ? this.notes[this.notes.length -1].id + 1 : 1
        }
      this.notes = [...this.notes, newNote]
        this.displayNotes()
        this.closeForm()
    }

    selectNote(event) {
        const $selectedNote = event.target.closest('.note');
        if(!$selectedNote) return;
        const [$noteTitle, $noteText] = $selectedNote.children
        this.title = $noteTitle.innerText;
        this.text = $noteText.innerText;
        this.id = $selectedNote.dataset.id;
    }

    displayNotes() {
        const hasNotes = this.notes.length > 0;
        this.$placeholder.style.display = hasNotes ? 'none' : 'flex';

        this.$notes.innerHTML = this.notes.map(note => `
        <div style="background: ${note.color};" class="note" data-id="${note.id}">
          <div class="${note.title && 'note-title'}">${note.title}</div>
          <div class="note-text">${note.text}</div>
          <div class="toolbar-container">
            <div class="toolbar">
              <img class="toolbar-color" src="https://icon.now.sh/palette">
              <img class="toolbar-delete" src="https://icon.now.sh/delete">
            </div>
          </div>
        </div>
     `).join('');
    }

    editNote() {
    const title = this.$modalTitle.value 
       const text = this.$modalText.value 
       this.notes = this.notes.map(note => 
        note.id === Number(this.id) ? {...note, title, text} : note
       )
       this.displayNotes()
    }
}

new App()