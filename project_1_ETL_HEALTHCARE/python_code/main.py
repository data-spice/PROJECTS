from logging_config import logger

from bronze_loader import load_bronze
from bronze_2_silver import run_pipeline
from gold_layer import run_gold_layer
from gold_refresh import refresh_gold



def run():

    logger.info("=" * 60)
    logger.info("Healthcare DW Pipeline Started")
    logger.info("=" * 60)

    try:
        load_bronze()
        run_pipeline()
        run_gold_layer()
        refresh_gold()

        logger.info("Pipeline completed successfully.")

    except Exception as e:
        logger.exception(e)
        raise


if __name__ == "__main__":
    run()