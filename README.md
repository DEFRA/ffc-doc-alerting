# Document Hub Alerting

Microservice to publish alerts from Document Hub events via GOV.UK Notify.

This service is part of the [Document Hub](https://github.com/DEFRA/ffc-pay-core).

## Prerequisites

- [Azure Service Bus](https://docs.microsoft.com/en-us/azure/service-bus-messaging/)
- [Docker](https://www.docker.com/)
- Either:
  - [Docker Compose](https://docs.docker.com/compose/install/linux/#install-the-plugin-manually)
  - [Docker-Compose (standalone)](https://docs.docker.com/compose/install/other/)

Optional:

- [Kubernetes](https://kubernetes.io/)
- [Helm](https://helm.sh/)

### Configuration

#### Azure Service Bus

This service publishes responses as messages to Azure Service Bus topics.

| Name                         | Description                                                                           |
| ---------------------------- | ------------------------------------------------------------------------------------- |
| `MESSAGE_QUEUE_HOST`         | Azure Service Bus hostname, e.g. `myservicebus.servicebus.windows.net`                |
| `MESSAGE_QUEUE_USER`         | Azure Service Bus SAS policy name, e.g. `RootManageSharedAccessKey`                   |
| `MESSAGE_QUEUE_PASSWORD`     | Azure Service Bus SAS policy key                                                      |
| `MESSAGE_QUEUE_SUFFIX`       | Developer initials, optional, will be automatically added to topic names, e.g. `-jw ` |
| `ALERT_TOPIC_ADDRESS`        | Azure Service Bus topic name for events, e.g. `ffc-doc-alert`                         |
| `ALERT_SUBSCRIPTION_ADDRESS` | Azure Service Bus subscription name for events, e.g. `ffc-doc-alerting`               |

##### Message schemas

All message schemas are fully documented in an [AsyncAPI specification](docs/asyncapi.yaml).

## Setup

### Configuration

These configuration values should be set in the [docker-compose.yaml](docker-compose.yaml) file or Helm [values file](helm/ffc-doc-alerting/values.yaml) if running Kubernetes.

| Name                           | Description                                                                                          |
| ------------------------------ | ---------------------------------------------------------------------------------------------------- |
| `APPINSIGHTS_CLOUDROLE`        | Azure App Insights cloud role                                                                        |
| `APPINSIGHTS_CONNECTIONSTRING` | Azure App Insights connection string                                                                 |
| `DEV_TEAM_EMAILS`              | `;` separated list of developer email addresses, receives all system issue alerts                    |
| `DEBT_ENRICHMENT_EMAILS`       | `;` separated list of debt enrichment email addresses, receives all debt enrichment alerts           |
| `INVALID_BANK_DETAILS_EMAILS`  | `;` separated list of invalid bank details email addresses, receives all invalid bank details alerts |
| `CORE_SOLUTIONS_TEAM_EMAILS`   | `;` separated list of core solutions team email addresses, receives all Siti Agri alerts             |
| `SFI_EMAILS`                   | `;` separated list of SFI email addresses, receives SFI alerts                                       |
| `ES_EMAILS`                    | `;` separated list of ES email addresses, receives all ES alerts                                     |
| `FC_EMAILS`                    | `;` separated list of FC email addresses, receives all FC alerts                                     |
| `TRADER_EMAILS`                | `;` separated list of trader email addresses, receives all trader alerts                             |
| `VET_VISITS_EMAILS`            | `;` separated list of vet visits email addresses, receives all vet visits alerts                     |
| `OPS_ANALYSIS_EMAILS`          | `;` separated list of operations analysis email addresses, receives all operations analysis related alerts                         |
| `FINANCE_EMAILS`               | `;` separated list of finance email addresses, receives all Expanded SFI Offer alerts     |
| `DEMOGRAPHICS_EMAILS`          | `;` separated list of demographics email addresses, receives all Expanded SFI Offer alerts     |
| `DAX_UNAVAILABLE_EMAILS`       | `;` separated list of DAX unavailable email addresses, receives all Expanded SFI Offer alerts     |
| `ESFIO_DAX_EMAILS`             | `;` separated list of ESFIO DAX email addresses, receives all Expanded SFI Offer alerts     |
| `D365_UNSETTLED_EMAILS`        | `;` separated list of D365 unsettled email addresses, receives all Expanded SFI Offer alerts     |
| `BPS_EMAILS`                   | `;` separated list of BPS email addresses, receives all Expanded SFI Offer alerts     |
| `CS_EMAILS`                    | `;` separated list of CS email addresses, receives all Expanded SFI Offer alerts     |
| `FFC_ENVIRONMENT`              | Environment code; `local`, `dev`, `test`, `pre` or `prod`. Defaults to `local`                       |
| `NOTIFY_API_KEY`               | GOV.UK Notify API key                                                                                |
| `SEND_ALERTS`                  | `true` to send alerts, `false` to log alerts only. Defaults to `true`                                |

#### Docker

Docker Compose can be used to build the container image.

```
docker compose build
```

The service will file watch application and test files so no need to rebuild the container unless a change to an npm package is made.

## How to start the service

The service can be run using the [start](scripts/start) script.

```
./scripts/start
```

This script accepts any Docker Compose [Up](https://docs.docker.com/engine/reference/commandline/compose_up/) argument.

### Debugging

A debugger can be attached to the running application using port `9329`.

## How to get an output

The output of this service is an email following receipt of a valid
event received from the Azure Service Bus subscription.

Use the [AsyncAPI specification](docs/asyncapi.yaml) to obtain a test input and submit to the Azure Service Bus topic, `ffc-doc-alert`.

You can use the [Azure Storage Explorer](https://azure.microsoft.com/en-gb/features/storage-explorer/) to view the contents of the Azure Table Storage tables.

## How to stop the service

The service can be stopped using the [stop](scripts/stop) script.

```
./scripts/stop
```

The script accepts any Docker Compose [Down](https://docs.docker.com/engine/reference/commandline/compose_down/) argument.

For example, to stop the service and clear all data volumes.

```
./scripts/stop -v
```

## How to test the service

The service can be tested using the [test](scripts/test) script.

```
./scripts/test
```

The script accepts the following arguments:

- `--watch/-w` - run tests with file watching to support Test Driven Development scenarios (TDD)
- `--debug/-d` - run tests in debug mode. Same as watch mode but will wait for a debugger to be attached before running tests.

## CI pipeline

This service uses the [FFC CI pipeline](https://github.com/DEFRA/ffc-jenkins-pipeline-library).

## Licence

THIS INFORMATION IS LICENSED UNDER THE CONDITIONS OF THE OPEN GOVERNMENT LICENCE found at:

<http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3>

The following attribution statement MUST be cited in your products and applications when using this information.

> Contains public sector information licensed under the Open Government license v3

### About the licence

The Open Government Licence (OGL) was developed by the Controller of Her Majesty's Stationery Office (HMSO) to enable information providers in the public sector to license the use and re-use of their information under a common open licence.

It is designed to encourage use and re-use of information freely and flexibly, with only a few conditions.
