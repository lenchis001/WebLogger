#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["WebLogger/WebLogger.csproj", "WebLogger/"]
RUN dotnet restore "WebLogger/WebLogger.csproj"
COPY . .
WORKDIR "/src/WebLogger"
RUN apt update && apt install nodejs npm -y
RUN dotnet build "WebLogger.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "WebLogger.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "WebLogger.dll"]