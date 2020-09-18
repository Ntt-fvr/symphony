{{- /*
Copyright (c) 2004-present Facebook All rights reserved.
Use of this source code is governed by a BSD-style
license that can be found in the LICENSE file.
*/ -}}

{{/* vim: set filetype=mustache: */}}
{{/* Expand the name of the chart. */}}
{{- define "symphony.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" -}}
{{- end }}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "symphony.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}
{{- end }}

{{/* Create chart name and version as used by the chart label. */}}
{{- define "symphony.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/* Selector labels */}}
{{- define "symphony.selectorLabels" -}}
app.kubernetes.io/name: {{ include "symphony.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/* Meta labels */}}
{{- define "symphony.metaLabels" -}}
{{ include "symphony.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
helm.sh/chart: {{ include "symphony.chart" . }}
{{- end }}

{{/* Meta labels for front service */}}
{{- define "symphony.front.metaLabels" -}}
app.kubernetes.io/component: front
{{ include "symphony.metaLabels" . }}
{{- end }}

{{/* Meta labels for admin service */}}
{{- define "symphony.admin.metaLabels" -}}
app.kubernetes.io/component: admin
{{ include "symphony.metaLabels" . }}
{{- end }}

{{/* Meta labels for graph service */}}
{{- define "symphony.graph.metaLabels" -}}
app.kubernetes.io/component: graph
{{ include "symphony.metaLabels" . }}
{{- end }}

{{/* Meta labels for async service */}}
{{- define "symphony.async.metaLabels" -}}
app.kubernetes.io/component: async
{{ include "symphony.metaLabels" . }}
{{- end }}

{{/* Meta labels for migrate job */}}
{{- define "symphony.migrate.metaLabels" -}}
app.kubernetes.io/component: migrate
{{ include "symphony.metaLabels" . }}
{{- end }}

{{/* Meta labels for store service */}}
{{- define "symphony.store.metaLabels" -}}
app.kubernetes.io/component: store
{{ include "symphony.metaLabels" . }}
{{- end }}

{{/* Meta labels for docs service */}}
{{- define "symphony.docs.metaLabels" -}}
app.kubernetes.io/component: docs
{{ include "symphony.metaLabels" . }}
{{- end }}

{{/* Meta labels for jobrunner job */}}
{{- define "symphony.jobrunner.metaLabels" -}}
app.kubernetes.io/component: jobrunner
{{ include "symphony.metaLabels" . }}
{{- end }}

{{/* Selector labels for front service */}}
{{- define "symphony.front.selectorLabels" -}}
{{ include "symphony.selectorLabels" . }}
app.kubernetes.io/component: front
{{- end }}

{{/* Selector labels for admin service */}}
{{- define "symphony.admin.selectorLabels" -}}
{{ include "symphony.selectorLabels" . }}
app.kubernetes.io/component: admin
{{- end }}

{{/* Selector labels for graph service */}}
{{- define "symphony.graph.selectorLabels" -}}
{{ include "symphony.selectorLabels" . }}
app.kubernetes.io/component: graph
{{- end }}

{{/* Selector labels for async service */}}
{{- define "symphony.async.selectorLabels" -}}
{{ include "symphony.selectorLabels" . }}
app.kubernetes.io/component: async
{{- end }}

{{/* Selector labels for store service */}}
{{- define "symphony.store.selectorLabels" -}}
{{ include "symphony.selectorLabels" . }}
app.kubernetes.io/component: store
{{- end }}

{{/* Selector labels for docs service */}}
{{- define "symphony.docs.selectorLabels" -}}
{{ include "symphony.selectorLabels" . }}
app.kubernetes.io/component: docs
{{- end }}

{{/* Fullname suffixed with front */}}
{{- define "symphony.front.fullname" -}}
{{- print (include "symphony.fullname" .) "-front" -}}
{{- end }}

{{/* Fullname suffixed with admin */}}
{{- define "symphony.admin.fullname" -}}
{{- print (include "symphony.fullname" .) "-admin" -}}
{{- end }}

{{/* Fullname suffixed with graph */}}
{{- define "symphony.graph.fullname" -}}
{{- print (include "symphony.fullname" .) "-graph" -}}
{{- end }}

{{/* Fullname suffixed with async */}}
{{- define "symphony.async.fullname" -}}
{{- print (include "symphony.fullname" .) "-async" -}}
{{- end }}

{{/* Fullname suffixed with migrate */}}
{{- define "symphony.migrate.fullname" -}}
{{- print (include "symphony.fullname" .) "-migrate" -}}
{{- end }}

{{/* Fullname suffixed with store */}}
{{- define "symphony.store.fullname" -}}
{{- print (include "symphony.fullname" .) "-store" -}}
{{- end }}

{{/* Fullname suffixed with docs */}}
{{- define "symphony.docs.fullname" -}}
{{- print (include "symphony.fullname" .) "-docs" -}}
{{- end }}

{{/* Create the name of front service account to use */}}
{{- define "symphony.front.serviceAccountName" -}}
{{- if .Values.front.serviceAccount.create -}}
{{ default (include "symphony.front.fullname" .) .Values.front.serviceAccount.name }}
{{- else -}}
{{ default "default" .Values.front.serviceAccount.name }}
{{- end -}}
{{- end }}

{{/* Create the name of admin service account to use */}}
{{- define "symphony.admin.serviceAccountName" -}}
{{- if .Values.admin.serviceAccount.create -}}
{{ default (include "symphony.admin.fullname" .) .Values.admin.serviceAccount.name }}
{{- else -}}
{{ default "default" .Values.admin.serviceAccount.name }}
{{- end -}}
{{- end }}

{{/* Create the name of graph service account to use */}}
{{- define "symphony.graph.serviceAccountName" -}}
{{- if .Values.graph.serviceAccount.create -}}
{{ default (include "symphony.graph.fullname" .) .Values.graph.serviceAccount.name }}
{{- else -}}
{{ default "default" .Values.graph.serviceAccount.name }}
{{- end -}}
{{- end }}

{{/* Create the name of async service account to use */}}
{{- define "symphony.async.serviceAccountName" -}}
{{- if .Values.async.serviceAccount.create -}}
{{ default (include "symphony.async.fullname" .) .Values.async.serviceAccount.name }}
{{- else -}}
{{ default "default" .Values.async.serviceAccount.name }}
{{- end -}}
{{- end }}

{{/* Create the name of store service account to use */}}
{{- define "symphony.store.serviceAccountName" -}}
{{- if .Values.store.serviceAccount.create -}}
{{ default (include "symphony.store.fullname" .) .Values.store.serviceAccount.name }}
{{- else -}}
{{ default "default" .Values.store.serviceAccount.name }}
{{- end -}}
{{- end }}

{{/* Create the name of docs service account to use */}}
{{- define "symphony.docs.serviceAccountName" -}}
{{- if .Values.docs.serviceAccount.create -}}
{{ default (include "symphony.docs.fullname" .) .Values.docs.serviceAccount.name }}
{{- else -}}
{{ default "default" .Values.docs.serviceAccount.name }}
{{- end -}}
{{- end }}

{{/* Generate admin client selector label */}}
{{- define "symphony.admin.clientLabel" -}}
{{- print (include "symphony.admin.fullname" .) "-client" }}: "true"
{{- end }}

{{/* Generate front pod labels */}}
{{- define "symphony.front.podLabels" -}}
{{ include "symphony.front.selectorLabels" . }}
{{ include "symphony.admin.clientLabel" . }}
{{- end }}

{{/* Create the name for orc8r certs secret */}}
{{- define "symphony.integrations.orc8r.certsSecretName" -}}
{{- print (include "symphony.fullname" .) "-orc8r-certs" -}}
{{- end }}

{{/* Create the name for graph database secret */}}
{{- define "symphony.graphDB.secretName" -}}
{{- print (include "symphony.fullname" .) "-graph-db" -}}
{{- end }}

{{/* Create the name for migrate database secret */}}
{{- define "symphony.migrate.secretName" -}}
{{- print (include "symphony.fullname" .) "-migrate-db" -}}
{{- end }}

{{/* Create the value for graph database secret */}}
{{- define "symphony.graphDB.stringData" -}}
{{- with .Values.graphDB.mysql }}
MYSQL_DSN: "{{ .user }}:{{ .pass }}@tcp({{ .host }}:{{ .port }})/{{ if .param }}?{{ .param }}{{ end }}"
{{- end }}
{{- end }}

{{/* Create logging enviroment variables for store service */}}
{{- define "symphony.loggingEnv" -}}
- name: LOG_LEVEL
  value: {{ .spec.log.level | quote }}
- name: LOG_FORMAT
  value: {{ .spec.log.format | quote }}
{{- end }}

{{/* Create tracing enviroment variables */}}
{{- define "symphony.tracingEnv" -}}
- name: TELEMETRY_TRACE_SAMPLING_PROBABILITY
  value: {{ int .Values.tracing.enabled | quote }}
{{- if .Values.tracing.enabled }}
- name: TELEMETRY_TRACE_EXPORTER
  value: "jaeger"
{{- if and (empty .Values.tracing.jaeger.collectorEndpoint) (empty .Values.tracing.jaeger.agentEndpoint) -}}
{{- fail "One of `collectorEndpoint` or `agentEndpoint` must be specified." }}
{{- end }}
{{- with .Values.tracing.jaeger.collectorEndpoint }}
- name: JAEGER_COLLECTOR_ENDPOINT
  value: {{ . | quote }}
{{- end }}
{{- with .Values.tracing.jaeger.agentEndpoint }}
- name: JAEGER_AGENT_ENDPOINT
  value: {{ . | quote }}
{{- end }}
{{- end }}
{{- end }}

{{/* Create image pull secrets list */}}
{{- define "symphony.imagePullSecrets" -}}
{{- with .Values.imagePullSecrets }}
imagePullSecrets: {{- toYaml . | nindent 2 }}
{{- end }}
{{- end }}

{{/* Create service metrics port */}}
{{- define "symphony.metricsPort" -}}
{{- if .Values.serviceMonitor.enabled }}
- name: http-metrics
  port: 9464
  targetPort: http
{{- end }}
{{- end }}
