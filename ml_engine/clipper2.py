from clipper_admin import ClipperConnection, DockerContainerManager
from clipper_admin.deployers import python as python_deployer
import json, logging, os


clipper_conn = ClipperConnection(DockerContainerManager())

#clipper_conn.stop_all()

#clipper_conn.start_clipper()
clipper_conn.connect()

app_name = "consultation"

def init_logging():
    rootLogger = logging.getLogger('my_logger')

    # LOG_DIR = os.getcwd() + '/' + 'logs'
    # if not os.path.exists(LOG_DIR):
    #     os.makedirs(LOG_DIR)
    # fileHandler = logging.FileHandler("{0}/{1}.log".format(LOG_DIR, "g2"))
    # rootLogger.addHandler(fileHandler)

    rootLogger.setLevel(logging.DEBUG)

    consoleHandler = logging.StreamHandler()
    rootLogger.addHandler(consoleHandler)

    return rootLogger

# #Register hello-world application
# clipper_conn.register_application(name=app_name, input_type="strings",
# default_output="default", slo_micros=10000000)

import pandas as pd

#input is type string
def predict(input):
    logger = init_logging()
    logger.debug("DEBUGINGG>>>>>>>>>>>")
    logger.debug((input[0]).encode())
    #print("xxkdjkfjdkfjd", file=sys.stderr)
    #df = pd.read_json(input[0], orient="columns")
    #df.to_csv('bla.csv')
    #return df['nausea'].tolist()[0]
    return [[2, True], []]
    

model_name = "consultation"
model_version = 31

python_deployer.deploy_python_closure(
    clipper_conn,
    name = model_name,
    version = model_version,
    input_type = "strings",
    func=predict,
    pkgs_to_install=["pandas"]
)

# #link model with application
# clipper_conn.link_model_to_app(
#     app_name = app_name,
#     model_name = model_name
# )

print(clipper_conn.get_all_apps())

print(clipper_conn.cm.get_num_replicas(name=model_name, version=model_version))