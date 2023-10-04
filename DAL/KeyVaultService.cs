using Azure.Identity;
using Azure.Security.KeyVault.Secrets;

public interface IKeyVaultService
{
    string GetSecretValue(string secretName);
}

public class KeyVaultService : IKeyVaultService
{
    private readonly SecretClient _secretClient;

    public KeyVaultService(string keyVaultName, string tenantId, string clientId, string clientSecret)
    {
        _secretClient = new SecretClient(new Uri($"https://{keyVaultName}.vault.azure.net/"), new ClientSecretCredential(tenantId, clientId, clientSecret));
    }

    public string GetSecretValue(string secretName)
    {
        var secretResponse = _secretClient.GetSecret(secretName);
        return secretResponse.Value.Value;
    }
}