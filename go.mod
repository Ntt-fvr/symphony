module github.com/facebookincubator/symphony

go 1.14

require (
	cloud.google.com/go/storage v1.10.0
	contrib.go.opencensus.io/exporter/jaeger v0.2.1
	contrib.go.opencensus.io/exporter/prometheus v0.2.0
	contrib.go.opencensus.io/integrations/ocsql v0.1.6
	github.com/360EntSecGroup-Skylar/excelize/v2 v2.3.1
	github.com/99designs/gqlgen v0.13.0
	github.com/AlekSi/pointer v1.1.0
	github.com/DATA-DOG/go-sqlmock v1.5.0
	github.com/Masterminds/squirrel v1.4.0
	github.com/NYTimes/gziphandler v1.1.1
	github.com/VividCortex/mysqlerr v0.0.0-20200629151747-c28746d985dd
	github.com/alecthomas/kong v0.2.11
	github.com/anmitsu/go-shlex v0.0.0-20200514113438-38f4b401e2be // indirect
	github.com/aws/aws-sdk-go v1.35.23
	github.com/badoux/checkmail v1.2.1
	github.com/cenkalti/backoff/v4 v4.1.0
	github.com/facebook/ent v0.4.4-0.20201030185257-8139aca845b1
	github.com/facebookincubator/ent-contrib v0.0.0-20201101132939-7984b86acfa0
	github.com/go-sql-driver/mysql v1.5.1-0.20200311113236-681ffa848bae
	github.com/golang/mock v1.4.4 // indirect
	github.com/google/uuid v1.1.2
	github.com/google/wire v0.4.0
	github.com/gorilla/mux v1.8.0
	github.com/gorilla/websocket v1.4.2
	github.com/hashicorp/go-multierror v1.1.0
	github.com/kisielk/errcheck v1.4.0 // indirect
	github.com/mattn/go-sqlite3 v2.0.3+incompatible
	github.com/opentracing/opentracing-go v1.2.0
	github.com/pborman/uuid v1.2.1 // indirect
	github.com/pelletier/go-toml v1.8.1
	github.com/pkg/errors v0.9.1
	github.com/prometheus/client_golang v1.7.1
	github.com/prometheus/common v0.14.0
	github.com/prometheus/procfs v0.2.0 // indirect
	github.com/prometheus/statsd_exporter v0.17.0 // indirect
	github.com/scylladb/go-set v1.0.2
	github.com/shurcooL/graphql v0.0.0-20181231061246-d48a9a75455f
	github.com/stretchr/testify v1.6.1
	github.com/uber-go/tally v3.3.17+incompatible // indirect
	github.com/uber/jaeger-client-go v2.25.0+incompatible
	github.com/uber/tchannel-go v1.20.1 // indirect
	github.com/vektah/gqlparser/v2 v2.1.0
	github.com/vmihailenco/msgpack/v5 v5.0.0-rc.2
	go.opencensus.io v0.22.5
	go.uber.org/cadence v0.14.1
	go.uber.org/yarpc v1.48.0
	go.uber.org/zap v1.16.0
	gocloud.dev v0.20.1-0.20200914152856-6be5a462804a
	gocloud.dev/pubsub/natspubsub v0.20.0
	golang.org/x/net v0.0.0-20201021035429-f5854403a974
	golang.org/x/sync v0.0.0-20201020160332-67f06af15bc9
	golang.org/x/text v0.3.3
	golang.org/x/time v0.0.0-20200630173020-3af7569d3a1e // indirect
	google.golang.org/api v0.30.0 // indirect
	google.golang.org/genproto v0.0.0-20200929141702-51c3e5b607fe // indirect
	google.golang.org/grpc v1.32.0 // indirect
	honnef.co/go/tools v0.0.1-2020.1.5 // indirect
)

replace github.com/apache/thrift => github.com/apache/thrift v0.0.0-20190309152529-a9b748bb0e02
