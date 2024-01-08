import { Router } from 'express';
import { addFlashcard, deleteFlashcard, getAllFlashcards,getOneFlashcards, replaceFlashcard, replaceSomeFieldsInFlashcard } from '../handler/flashCardHandler';
import { IFlashcard, IPatchFlashcard } from '../interfaces';



 const flashcardRouter = Router();

 flashcardRouter.get('/',(req,res)=>{
    try {
        const flashcards = getAllFlashcards();
        res.status(200).json({ flashcards });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
 });
 
flashcardRouter.get('/:suuid', (req, res) => {
    const suuid = req.params.suuid
    const flashcard = getOneFlashcards(suuid);
	if (flashcard) {
		res.json(flashcard);
	} else {
		res.status(404).json(`Flashcard with suuid "${suuid}" not found.`)
	}
});
 
flashcardRouter.post('/', async(req, res) => {
    const newFlashcard = req.body;
	const flashcard = await addFlashcard(newFlashcard);
	res.json(flashcard);
});
 
flashcardRouter.put('/', async (req, res) => {
	const flashcard: IFlashcard = req.body;
	const replacedFlashcard = await replaceFlashcard(flashcard);
	if (replacedFlashcard) {
		res.json(replacedFlashcard);
	} else {
		res.status(404).json(`Flashcard with suuid "${flashcard.suuid}" not found.`)
	}
});

flashcardRouter.patch('/:suuid', async (req, res) => {
	const suuid = req.params.suuid;
	const patchFlashcard: IPatchFlashcard = req.body;
	const replacedFlashcard = await replaceSomeFieldsInFlashcard(suuid, patchFlashcard);
	if (replacedFlashcard) {
		res.json(replacedFlashcard);
	} else {
		res.status(404).json(`Flashcard with suuid "${suuid}" not found.`)
	}
});

flashcardRouter.delete('/:suuid', async (req, res) => {
	const suuid = req.params.suuid;
	const deletedFlashcard = await deleteFlashcard(suuid);
	if (deletedFlashcard) {
		res.json(deletedFlashcard);
	} else {
		res.status(404).json(`Flashcard with suuid "${suuid}" not found.`)
	}
})





 export default flashcardRouter