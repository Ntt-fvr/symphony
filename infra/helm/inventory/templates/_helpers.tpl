{{- /*
Copyright (c) 2004-present Facebook All rights reserved.
Use of this source code is governed by a BSD-style
license that can be found in the LICENSE file.
*/ -}}

{{/* vim: set filetype=mustache: */}}
{{/* Expand the name of the chart. */}}
{{- define "inventory.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" -}}
{{- end }}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "inventory.fullname" -}}
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
{{- define "inventory.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/* Selector labels */}}
{{- define "inventory.selectorLabels" -}}
app.kubernetes.io/name: {{ include "inventory.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/* Meta labels */}}
{{- define "inventory.metaLabels" -}}
{{ include "inventory.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
helm.sh/chart: {{ include "inventory.chart" . }}
{{- end }}

{{/* Meta labels for front service */}}
{{- define "inventory.front.metaLabels" -}}
app.kubernetes.io/component: front
{{ include "inventory.metaLabels" . }}
{{- end }}

{{/* Meta labels for graph service */}}
{{- define "inventory.graph.metaLabels" -}}
app.kubernetes.io/component: graph
{{ include "inventory.metaLabels" . }}
{{- end }}

{{/* Meta labels for migrate job */}}
{{- define "inventory.migrate.metaLabels" -}}
app.kubernetes.io/component: migrate
{{ include "inventory.metaLabels" . }}
{{- end }}

{{/* Meta labels for store service */}}
{{- define "inventory.store.metaLabels" -}}
app.kubernetes.io/component: store
{{ include "inventory.metaLabels" . }}
{{- end }}

{{/* Meta labels for docs service */}}
{{- define "inventory.docs.metaLabels" -}}
app.kubernetes.io/component: docs
{{ include "inventory.metaLabels" . }}
{{- end }}

{{/* Meta labels for jobrunner job */}}
{{- define "inventory.jobrunner.metaLabels" -}}
app.kubernetes.io/component: jobrunner
{{ include "inventory.metaLabels" . }}
{{- end }}

{{/* Selector labels for front service */}}
{{- define "inventory.front.selectorLabels" -}}
{{ include "inventory.selectorLabels" . }}
app.kubernetes.io/component: front
{{- end }}

{{/* Selector labels for graph service */}}
{{- define "inventory.graph.selectorLabels" -}}
{{ include "inventory.selectorLabels" . }}
app.kubernetes.io/component: graph
{{- end }}

{{/* Selector labels for store service */}}
{{- define "inventory.store.selectorLabels" -}}
{{ include "inventory.selectorLabels" . }}
app.kubernetes.io/component: store
{{- end }}

{{/* Selector labels for docs service */}}
{{- define "inventory.docs.selectorLabels" -}}
{{ include "inventory.selectorLabels" . }}
app.kubernetes.io/component: docs
{{- end }}

{{/* Fullname suffixed with front */}}
{{- define "inventory.front.fullname" -}}
{{- print (include "inventory.fullname" .) "-front" -}}
{{- end }}

{{/* Fullname suffixed with graph */}}
{{- define "inventory.graph.fullname" -}}
{{- print (include "inventory.fullname" .) "-graph" -}}
{{- end }}

{{/* Fullname suffixed with migrate */}}
{{- define "inventory.migrate.fullname" -}}
{{- print (include "inventory.fullname" .) "-migrate" -}}
{{- end }}

{{/* Fullname suffixed with store */}}
{{- define "inventory.store.fullname" -}}
{{- print (include "inventory.fullname" .) "-store" -}}
{{- end }}

{{/* Fullname suffixed with docs */}}
{{- define "inventory.docs.fullname" -}}
{{- print (include "inventory.fullname" .) "-docs" -}}
{{- end }}

{{/* Create the name of front service account to use */}}
{{- define "inventory.front.serviceAccountName" -}}
{{- if .Values.front.serviceAccount.create -}}
{{ default (include "inventory.front.fullname" .) .Values.front.serviceAccount.name }}
{{- else -}}
{{ default "default" .Values.front.serviceAccount.name }}
{{- end -}}
{{- end }}

{{/* Create the name of graph service account to use */}}
{{- define "inventory.graph.serviceAccountName" -}}
{{- if .Values.graph.serviceAccount.create -}}
{{ default (include "inventory.graph.fullname" .) .Values.graph.serviceAccount.name }}
{{- else -}}
{{ default "default" .Values.graph.serviceAccount.name }}
{{- end -}}
{{- end }}

{{/* Create the name of store service account to use */}}
{{- define "inventory.store.serviceAccountName" -}}
{{- if .Values.store.serviceAccount.create -}}
{{ default (include "inventory.store.fullname" .) .Values.store.serviceAccount.name }}
{{- else -}}
{{ default "default" .Values.store.serviceAccount.name }}
{{- end -}}
{{- end }}

{{/* Create the name of docs service account to use */}}
{{- define "inventory.docs.serviceAccountName" -}}
{{- if .Values.docs.serviceAccount.create -}}
{{ default (include "inventory.docs.fullname" .) .Values.docs.serviceAccount.name }}
{{- else -}}
{{ default "default" .Values.docs.serviceAccount.name }}
{{- end -}}
{{- end }}

{{/* Create the name for orc8r certs secret */}}
{{- define "inventory.integrations.orc8r.certsSecretName" -}}
{{- print (include "inventory.fullname" .) "-orc8r-certs" -}}
{{- end }}

{{/* Create logging enviroment variables for store service */}}
{{- define "inventory.loggingEnv" -}}
- name: LOG_LEVEL
  value: {{ .spec.log.level | quote }}
- name: LOG_FORMAT
  value: {{ .spec.log.format | quote }}
{{- end }}

{{/* Create tracing enviroment variables */}}
{{- define "inventory.tracingEnv" -}}
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
{{- define "inventory.imagePullSecrets" -}}
{{- with .Values.imagePullSecrets }}
imagePullSecrets: {{- toYaml . | nindent 2 }}
{{- end }}
{{- end }}
