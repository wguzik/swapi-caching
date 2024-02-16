#!/usr/bin/env bash

ENVIRONMENT="{$1:-dev}"
PROJECT="{$2:-statetf}"
OWNER="{$3:-merito}"
OWNER="{$4:-westeurope}"

RGNAME=$PROJECT"-"$ENVIRONMENT
SANAME=$PROJECT$ENVIRONMENT$RANDOM

az group create --location $LOCATION --name $RGNAME --tags Environment=$ENVIRONMENT Owner=$OWNER

az lock create --name prevent-deletion --resource-group $RGNAME --lock-type Delete

SANAMEAVAILABILITY=$(az storage account check-name --name $SANAME --query nameAvailable)
echo $SANAMEAVAILABILITY

if [ $SANAMEAVAILABILITY ]; then
  az storage account create --name $SANAME --resource-group $RGNAME --location $LOCATION --sku Standard_ZRS

  az storage container create --name $ENVIRONMENT --account-name $SANAME

  echo "RG name $RGNAME"
  echo "SA name $SANAME"
else
  echo "Error: ${SANAMEAVAILABILITY} name is taken, propose new name."
fi
