using UnityEngine;
using System.Collections;
using System.IO;

public class test1 : MonoBehaviour {





	// Use this for initialization
	void Start () {

		Debug.Log ("Hello World");
		string url = "/data/data/com.app_1/files/data.json";

		if (File.Exists (url)) {

			string newContent = "endret alt json dataen";
			File.WriteAllText(url, newContent);
		} else {

			Debug.Log ("files does not exist");
		}


	}

	// Update is called once per frame
	void Update () {

	}
}
