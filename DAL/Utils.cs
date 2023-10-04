namespace server.DAL
{
	public class Utils
	{
		public static (string, string, string, string) GenerateConnectionString()
		{
            var connectionString = Environment.GetEnvironmentVariable("DISCUSSIONS_VAULT_CONNECTION") ?? throw new Exception("DISCUSSIONS_VAULT_CONNECTION env variable not provided");

            string[] parts = connectionString.Split(':');

            if (parts.Length != 4)
            {
                throw new Exception("DISCUSSIONS_VAULT_CONNECTION env variable not valid");
            }

            return (parts[0], parts[1], parts[2], parts[3]);
        }
	}
}

