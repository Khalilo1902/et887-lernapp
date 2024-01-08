import {Router} from 'express';

 const router = Router();

router.get('/', (req, res) => {
	res.json({
		appName: "API for AppLearn version 0.1"
	})
});


export default router