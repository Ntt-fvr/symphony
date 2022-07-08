module github.com/facebookincubator/symphony

go 1.14

require (
	cloud.google.com/go/storage v1.23.0
	contrib.go.opencensus.io/exporter/jaeger v0.2.1
	contrib.go.opencensus.io/exporter/prometheus v0.3.0
	contrib.go.opencensus.io/integrations/ocsql v0.1.7
	github.com/360EntSecGroup-Skylar/excelize/v2 v2.3.1
	github.com/99designs/gqlgen v0.17.10
	github.com/AlekSi/pointer v1.1.0
	github.com/Azure/go-autorest/autorest/adal v0.9.20 // indirect
	github.com/DATA-DOG/go-sqlmock v1.5.0
	github.com/HdrHistogram/hdrhistogram-go v1.0.1 // indirect
	github.com/Masterminds/squirrel v1.5.0
	github.com/NYTimes/gziphandler v1.1.1
	github.com/VividCortex/mysqlerr v0.0.0-20200629151747-c28746d985dd
	github.com/alecthomas/kong v0.2.12
	github.com/alecthomas/units v0.0.0-20201120081800-1786d5ef83d4 // indirect
	github.com/anmitsu/go-shlex v0.0.0-20200514113438-38f4b401e2be // indirect
	github.com/aws/aws-sdk-go v1.43.31
	github.com/badoux/checkmail v1.2.1
	github.com/cenkalti/backoff/v4 v4.1.0
	github.com/cespare/xxhash/v2 v2.1.2 // indirect
	github.com/confluentinc/confluent-kafka-go v1.9.0
	github.com/evanphx/json-patch v0.5.2
	github.com/facebook/ent v0.5.2-0.20201207120713-86b9d850ee78
	github.com/facebookincubator/ent-contrib v0.0.0-20201210145028-3c4e794cc516
	github.com/go-sql-driver/mysql v1.6.0
	github.com/golang/snappy v0.0.4 // indirect
	github.com/google/addlicense v1.0.0
	github.com/google/cel-go v0.11.4
	github.com/google/uuid v1.3.0
	github.com/google/wire v0.5.0
	github.com/gorilla/mux v1.8.0
	github.com/gorilla/websocket v1.5.0
	github.com/hashicorp/go-multierror v1.1.1
	github.com/kr/pretty v0.3.0 // indirect
	github.com/mattn/go-sqlite3 v2.0.3+incompatible
	github.com/opentracing/opentracing-go v1.2.0
	github.com/pborman/uuid v1.2.1 // indirect
	github.com/pelletier/go-toml v1.8.1
	github.com/pkg/errors v0.9.1
	github.com/prometheus/client_golang v1.9.0
	github.com/prometheus/common v0.15.0
	github.com/prometheus/procfs v0.7.3 // indirect
	github.com/scylladb/go-set v1.0.2
	github.com/shurcooL/graphql v0.0.0-20200928012149-18c5c3165e3a
	github.com/sirupsen/logrus v1.8.1 // indirect
	github.com/stretchr/testify v1.8.0
	github.com/uber-go/tally v3.3.17+incompatible // indirect
	github.com/uber/jaeger-client-go v2.25.0+incompatible
	github.com/uber/jaeger-lib v2.4.0+incompatible // indirect
	github.com/uber/tchannel-go v1.20.1 // indirect
	github.com/vektah/gqlparser/v2 v2.4.5
	github.com/vmihailenco/msgpack/v5 v5.1.0
	github.com/xuri/efp v0.0.0-20201016154823-031c29024257 // indirect
	go.opencensus.io v0.23.0
	go.uber.org/cadence v0.19.1
	go.uber.org/yarpc v1.55.0
	go.uber.org/zap v1.21.0
	gocloud.dev v0.25.0
	gocloud.dev/pubsub/natspubsub v0.21.0
	golang.org/x/net v0.0.0-20220617184016-355a448f1bc9
	golang.org/x/sync v0.0.0-20220601150217-0de741cfad7f
	golang.org/x/text v0.3.7
	google.golang.org/genproto v0.0.0-20220617124728-180714bec0ad
	google.golang.org/protobuf v1.28.0
	honnef.co/go/tools v0.0.1-2020.1.6 // indirect
)

replace github.com/apache/thrift => github.com/apache/thrift v0.0.0-20190309152529-a9b748bb0e02
