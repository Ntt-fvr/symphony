module github.com/facebookincubator/symphony

go 1.14

require (
	cloud.google.com/go/storage v1.12.0
	contrib.go.opencensus.io/exporter/jaeger v0.2.1
	contrib.go.opencensus.io/exporter/prometheus v0.2.0
	contrib.go.opencensus.io/integrations/ocsql v0.1.7
	github.com/360EntSecGroup-Skylar/excelize/v2 v2.3.1
	github.com/99designs/gqlgen v0.13.0
	github.com/AlekSi/pointer v1.1.0
	github.com/DATA-DOG/go-sqlmock v1.5.0
	github.com/HdrHistogram/hdrhistogram-go v1.0.1 // indirect
	github.com/Masterminds/squirrel v1.5.0
	github.com/NYTimes/gziphandler v1.1.1
	github.com/VividCortex/mysqlerr v0.0.0-20200629151747-c28746d985dd
	github.com/alecthomas/kong v0.2.12
	github.com/alecthomas/units v0.0.0-20201120081800-1786d5ef83d4 // indirect
	github.com/anmitsu/go-shlex v0.0.0-20200514113438-38f4b401e2be // indirect
	github.com/aws/aws-sdk-go v1.36.30
	github.com/badoux/checkmail v1.2.1
	github.com/cenkalti/backoff/v4 v4.1.0
	github.com/facebook/ent v0.5.2-0.20201207120713-86b9d850ee78
	github.com/facebookincubator/ent-contrib v0.0.0-20201210145028-3c4e794cc516
	github.com/go-lintpack/lintpack v0.5.2 // indirect
	github.com/go-sql-driver/mysql v1.5.1-0.20200311113236-681ffa848bae
	github.com/golangci/errcheck v0.0.0-20181223084120-ef45e06d44b6 // indirect
	github.com/golangci/go-tools v0.0.0-20190318055746-e32c54105b7c // indirect
	github.com/golangci/goconst v0.0.0-20180610141641-041c5f2b40f3 // indirect
	github.com/golangci/gocyclo v0.0.0-20180528134321-2becd97e67ee // indirect
	github.com/golangci/golangci-lint v1.42.0 // indirect
	github.com/golangci/gosec v0.0.0-20190211064107-66fb7fc33547 // indirect
	github.com/golangci/ineffassign v0.0.0-20190609212857-42439a7714cc // indirect
	github.com/golangci/prealloc v0.0.0-20180630174525-215b22d4de21 // indirect
	github.com/google/uuid v1.2.0
	github.com/google/wire v0.5.0
	github.com/gorilla/mux v1.8.0
	github.com/gorilla/websocket v1.4.2
	github.com/hashicorp/go-multierror v1.1.1
	github.com/klauspost/cpuid v1.2.0 // indirect
	github.com/mattn/go-sqlite3 v2.0.3+incompatible
	github.com/opentracing/opentracing-go v1.2.0
	github.com/pborman/uuid v1.2.1 // indirect
	github.com/pelletier/go-toml v1.9.3
	github.com/pkg/errors v0.9.1
	github.com/prometheus/client_golang v1.8.0
	github.com/prometheus/common v0.15.0
	github.com/prometheus/statsd_exporter v0.18.0 // indirect
	github.com/scylladb/go-set v1.0.2
	github.com/shirou/gopsutil v0.0.0-20180427012116-c95755e4bcd7 // indirect
	github.com/shirou/w32 v0.0.0-20160930032740-bb4de0191aa4 // indirect
	github.com/shurcooL/graphql v0.0.0-20200928012149-18c5c3165e3a
	github.com/stretchr/testify v1.7.0
	github.com/uber-go/tally v3.3.17+incompatible // indirect
	github.com/uber/jaeger-client-go v2.25.0+incompatible
	github.com/uber/jaeger-lib v2.4.0+incompatible // indirect
	github.com/uber/tchannel-go v1.20.1 // indirect
	github.com/vektah/gqlparser/v2 v2.1.0
	github.com/vmihailenco/msgpack/v5 v5.1.0
	github.com/xuri/efp v0.0.0-20201016154823-031c29024257 // indirect
	go.opencensus.io v0.23.0
	go.uber.org/cadence v0.15.0
	go.uber.org/yarpc v1.49.1
	go.uber.org/zap v1.17.0
	gocloud.dev v0.21.0
	gocloud.dev/pubsub/natspubsub v0.21.0
	golang.org/x/net v0.0.0-20210428140749-89ef3d95e781
	golang.org/x/sync v0.0.0-20210220032951-036812b2e83c
	golang.org/x/text v0.3.6
	golang.org/x/time v0.0.0-20201208040808-7e3f01d25324 // indirect
	gopkg.in/airbrake/gobrake.v2 v2.0.9 // indirect
	gopkg.in/gemnasium/logrus-airbrake-hook.v2 v2.1.2 // indirect
	gopkg.in/yaml.v2 v2.4.0 // indirect
	sourcegraph.com/sqs/pbtypes v0.0.0-20180604144634-d3ebe8f20ae4 // indirect
)

replace github.com/apache/thrift => github.com/apache/thrift v0.0.0-20190309152529-a9b748bb0e02
