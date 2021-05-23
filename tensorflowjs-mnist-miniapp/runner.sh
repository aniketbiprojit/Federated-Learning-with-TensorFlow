#! bash/sh
echo "Training models"
node trainer.js --epochs 5 --model_save_path trained_model
echo "Serving on web localhost:1992"
node server.js --model_path trained_model