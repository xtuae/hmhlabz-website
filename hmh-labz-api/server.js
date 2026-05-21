import 'dotenv/config';
import app from './api/index.js';

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`> HMH Labz API listening on port ${PORT}`);
});
