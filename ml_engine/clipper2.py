from clipper_admin import ClipperConnection, DockerContainerManager
from clipper_admin.deployers import python as python_deployer
import json

clipper_conn = ClipperConnection(DockerContainerManager())

#clipper_conn.stop_all()

#clipper_conn.start_clipper()
clipper_conn.connect()

app_name = "test2"

# #Register hello-world application
# clipper_conn.register_application(name=app_name, input_type="bytes",
# default_output="default", slo_micros=10000000)

#input is type string
def predict(input):
    print(input)

    return [[2, True], []]
    

model_name = "test2"
model_version = 1

python_deployer.deploy_python_closure(
    clipper_conn,
    name = model_name,
    version = model_version,
    input_type = "bytes",
    func=predict,
    #pkgs_to_install=['json']
)

# #link model with application
# clipper_conn.link_model_to_app(
#     app_name = app_name,
#     model_name = model_name
# )

print(clipper_conn.get_all_apps())

print(clipper_conn.cm.get_num_replicas(name=model_name, version=model_version))